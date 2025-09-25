from flask import Flask, request, jsonify
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

def get_db_connection():
    return mysql.connector.connect(
        host="10.9.120.5",      # IP de tu servidor
        user="shoes",           # tu usuario de MySQL
        password="shoes1234",   # tu contraseña
        database="shoeStore",
        port=3306
    )

# Función para registrar usuario con contraseña hasheada
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    hashed = generate_password_hash(password)
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO usuarios (email, password_hash) VALUES (%s, %s)",
        (email, hashed)
    )
    db.commit()
    cursor.close()
    db.close()
    return jsonify({"message": "Usuario registrado"})

# Función para autenticar usuario verificando el hash
@app.route('/login', methods=['POST'])
def login ():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios WHERE email = %s", (email,))
    result = cursor.fetchone()
    cursor.close()
    db.close()
    if result and check_password_hash(result["password_hash"], password):
        return jsonify({"message": "Login exitoso"})
    else:
        return jsonify({"error": "Credenciales incorrectas"}), 401
    

if __name__ == '__main__':
    app.run(debug=True)