import syft as sy
import tenseal as ts
import numpy as np
import pandas as pd
from sklearn.datasets import load_breast_cancer

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

data_site = sy.orchestra.launch(name="cancer-research-centre", reset=True)
client = data_site.login(email="info@openmined.org", password="changethis")

# Load the dataset
data = load_breast_cancer()
X = pd.DataFrame(data.data, columns=data.feature_names)
y = pd.DataFrame(data.target, columns=["target"])

# Create mock data by adding noise
np.random.seed(42)
X_mock = X + np.random.normal(0, 1, X.shape)
y_mock = y.sample(frac=1).reset_index(drop=True)

features_asset = sy.Asset(
    name="Breast Cancer Data: Features",
    data=X,
    mock=X_mock
)

targets_asset = sy.Asset(
    name="Breast Cancer Data: Targets",
    data=y,
    mock=y_mock
)

breast_cancer_dataset = sy.Dataset(
    name="Breast Cancer Biomarker",
    description="Breast cancer dataset with features and target labels.",
    summary="Predict whether the cancer is benign or malignant.",
    citation="Dua, D. and Graff, C. (2019). UCI Machine Learning Repository.",
    url="https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+(Diagnostic)"
)

breast_cancer_dataset.add_asset(features_asset)
breast_cancer_dataset.add_asset(targets_asset)

client.upload_dataset(dataset=breast_cancer_dataset)

# Log in as Data Owner
client = data_site.login(email="info@openmined.org", password="changethis")

# Update Data Owner credentials
client.account.set_email("owen@cancer-research.science")
client.account.set_password("securepassword", confirm=False)

# Create Data Scientist account
rachel_account_info = client.users.create(
    email="rachel@datascience.inst",
    name="Dr. Rachel Data",
    password="datascience123",
    password_verify="datascience123",
    institution="Data Science Institute",
    website="https://datascience.inst"
)

# Log in as Rachel
client = data_site.login(email="rachel@datascience.inst", password="datascience123")

bc_dataset = client.datasets["Breast Cancer Biomarker"]
features, targets = bc_dataset.assets

# Get mock data
X_mock = features.mock
y_mock = targets.mock

def train_logistic_regression(X, y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)
    model = LogisticRegression()
    model.fit(X_train, y_train)
    acc = accuracy_score(y_test, model.predict(X_test))
    return model, acc

# Test on mock data
model_mock, acc_mock = train_logistic_regression(X_mock, y_mock.values.ravel())
print(f"Accuracy on mock data: {acc_mock:.2f}")


def create_context():
    context = ts.context(
        ts.SCHEME_TYPE.CKKS,
        poly_modulus_degree=8192,
        coeff_mod_bit_sizes=[60, 40, 40, 60]
    )
    context.global_scale = 2 ** 40
    context.generate_galois_keys()
    return context

ctx = create_context()


# Assuming X_mock and y_mock are the features and labels you want to encrypt
encrypted_features = [ts.ckks_vector(ctx, x.tolist()) for x in X_mock.values]
encrypted_labels = [ts.ckks_vector(ctx, [y]) for y in y_mock.values.ravel()]

# Serialize context and data for sending to the server
ctx_serialized = ctx.serialize()
encrypted_features_serialized = [enc_x.serialize() for enc_x in encrypted_features]
encrypted_labels_serialized = [enc_y.serialize() for enc_y in encrypted_labels]

# Package data to send to the Datasite
remote_data = {
    "context": ctx_serialized,
    "features": encrypted_features_serialized,
    "labels": encrypted_labels_serialized
}

def encrypted_training(features_data, labels_data):
    import tenseal as ts
    import numpy as np
    from sklearn.linear_model import LogisticRegression
    from sklearn.preprocessing import StandardScaler
    from sklearn.metrics import accuracy_score

    # Set up TenSEAL context
    context = ts.context(
        ts.SCHEME_TYPE.CKKS,
        poly_modulus_degree=8192,
        coeff_mod_bit_sizes=[60, 40, 40, 60]
    )
    context.global_scale = 2 ** 40
    context.generate_galois_keys()

    # Encrypt the data
    X = features_data.values
    y = labels_data.values.ravel()

    encrypted_features = [ts.ckks_vector(context, x.tolist()) for x in X]
    encrypted_labels = [ts.ckks_vector(context, [label]) for label in y]

    # Decrypt data (since we have the secret key here)
    X_decrypted = np.array([enc_x.decrypt() for enc_x in encrypted_features])
    y_decrypted = np.array([enc_y.decrypt()[0] for enc_y in encrypted_labels])

    # Convert labels to integers
    y_decrypted = np.rint(y_decrypted).astype(int)

    # Training
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X_decrypted)
    model = LogisticRegression()
    model.fit(X_scaled, y_decrypted)

    # Serialize model coefficients
    model_data = {
        "coef": model.coef_.tolist(),
        "intercept": model.intercept_.tolist(),
        "scaler_mean": scaler.mean_.tolist(),
        "scaler_scale": scaler.scale_.tolist()
    }
    return model_data


remote_user_code = sy.syft_function_single_use(
    features_data=features,
    labels_data=targets
)(encrypted_training)

# Create project
project = client.create_project(
    name="Encrypted Logistic Regression 2",
    description="Train logistic regression on encrypted data using homomorphic encryption.",
    user_email_address="rachel@datascience.inst"
)

# Submit code request
code_request = project.create_code_request(remote_user_code, client)

# Data Owner logs in
client_owner = data_site.login(email="owen@cancer-research.science", password="securepassword")

# Review and approve the request
request = client_owner.requests[-1]

print(request.code.raw_code)
print(dir(request.code.raw_code))
request.approve()

# Data Scientist executes code
result = client.code.encrypted_training(features_data=features, labels_data=targets)

# Load model parameters
model_params = result.get()

# Reconstruct model
model = LogisticRegression()
model.coef_ = np.array(model_params["coef"])
model.intercept_ = np.array(model_params["intercept"])
scaler = StandardScaler()
scaler.mean_ = np.array(model_params["scaler_mean"])
scaler.scale_ = np.array(model_params["scaler_scale"])
# Set model classes_
model.classes_ = np.array([0, 1])  # Assuming binary classification with classes 0 and 1

# Use model on new data
# Assuming you have new data X_new
X_new = X_mock.iloc[:5].values  # Convert to NumPy array
X_new_scaled = scaler.transform(X_new)
predictions = model.predict(X_new_scaled)
print("Predictions on new data:", predictions)

# Get true labels for the new data
y_new_true = y_mock.iloc[:5].values.ravel()

# Compare predictions to true labels
print("True labels:", y_new_true)
print("Predictions:", predictions)

# Compute accuracy on the new data
from sklearn.metrics import accuracy_score
accuracy_new = accuracy_score(y_new_true, predictions)
print(f"Accuracy on new data: {accuracy_new:.2f}")

# Use model to predict on the entire mock dataset
X_mock_array = X_mock.values  # Convert to NumPy array
X_mock_scaled = scaler.transform(X_mock_array)
predictions_full = model.predict(X_mock_scaled)

# Compute accuracy on the full mock dataset
accuracy_full = accuracy_score(y_mock.values.ravel(), predictions_full)
print(f"Accuracy of reconstructed model on mock data: {accuracy_full:.2f}")