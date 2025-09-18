#conexion

import mysql.connector
from flask import Flask, g 

app = Flask(__name__)

def abrirConexion():
    if 'db' not in g:
        g.db = mysql.connector.connect(
            host="10.9.120.5",      # IP de tu servidor
            user="shoes",           # tu usuario de MySQL
            password="shoes1234",   # tu contraseña
            database="shoeStore",   # tu base en phpMyAdmin
            port=3306               #puerto
        )
    return g.db

def cerrarConexion(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()
