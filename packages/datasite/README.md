### Step 1.

Install poetry dependencies

```bash
pip install poetry
```

### Step 2.

Run poetry shell to activate poetry environment

```bash
poetry shell
```

### If there are some issues with poetry, try to remove the poetry.lock file and run poetry install again

### To get access to the code from the request, you can use the following code:

```python
print(request.code.raw_code)
```
