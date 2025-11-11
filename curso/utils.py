import secrets
import string

def generarPassword(len=10):
    caracteres = string.ascii_letters + string.digits + string.punctuation
    password = ""
    for i in range(len):
        password+=secrets.choice(caracteres)
    return password