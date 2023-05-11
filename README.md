# ONS POC

### How to run the FastAPI

```
$ cd backend
$ python3 -m venv env
$ source env/bin/activate
(env)$ pip install -r requirements.txt
(env)$ python main.py
# Depending on your python version you may need to run the following command instead.
(env)$ python3 main.py
```

### How to run the ReactJS

```
$ cd frontend
$ npm install
$ npm run start
```

### Permissions for pre-commit hooks

To ensure everyone has the correct permissions for the pre-commit hooks located in `.githooks/pre-commit`, run the following command in the **_root_** folder of the project:

```
ls -l .githooks/pre-commit
```

This command will output the file permissions for the pre-commit hook file. An example output is shown below:

```
-rwxr-xr-x  1 my_user_name  staff  1234 May 10 17:02 .githooks/pre-commit
```

If the permissions are not set correctly, you can change them by running:

```
chmod +x .githooks/pre-commit
```
