from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash
import os
from dotenv import load_dotenv
import re  # Para validación de email
from flask_cors import CORS  # Para manejar CORS

load_dotenv()  # Carga variables de .env

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas las rutas
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
jwt = JWTManager(app)  # Para tokens JWT

def get_db_connection():
    return mysql.connector.connect(
        host=os.environ.get('DB_HOST'),
        user=os.environ.get('DB_USER'),
        password=os.environ.get('DB_PASSWORD'),
        database=os.environ.get('DB_NAME'),
        port=int(os.getenv("DB_PORT"))
    )

# Validación básica de email
def is_valid_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

# Función para registrar usuario
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Datos requeridos en JSON"}), 400
        
        email = data.get("email")
        password = data.get("password")
        
        # Validaciones
        if not email or not password:
            return jsonify({"error": "Email y password son requeridos"}), 400
        if not is_valid_email(email):
            return jsonify({"error": "Email inválido"}), 400
        if len(password) < 6:
            return jsonify({"error": "Password debe tener al menos 6 caracteres"}), 400
        
        # Verificar si email ya existe
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("SELECT id FROM usuarios WHERE email = %s", (email,))
        if cursor.fetchone():
            cursor.close()
            db.close()
            return jsonify({"error": "Email ya registrado"}), 409  # Conflict
        
        # Insertar usuario
        hashed = generate_password_hash(password, method='pbkdf2:sha256')
        cursor.execute(
            "INSERT INTO usuarios (email, password_hash) VALUES (%s, %s)",
            (email, hashed)
        )
        db.commit()
        cursor.close()
        db.close()
        return jsonify({"message": "Usuario registrado exitosamente"}), 201
    
    except mysql.connector.Error as err:
        return jsonify({"error": f"Error en base de datos: {str(err)}"}), 500
    except Exception as e:
        return jsonify({"error": "Error interno del servidor"}), 500

# Función para login (devuelve JWT token)
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Datos requeridos en JSON"}), 400
        
        email = data.get("email")
        password = data.get("password")
        
        if not email or not password:
            return jsonify({"error": "Email y password son requeridos"}), 400
        
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM usuarios WHERE email = %s", (email,))
        result = cursor.fetchone()
        cursor.close()
        db.close()
        
        if result and check_password_hash(result["password_hash"], password):
            # Crear token JWT (expira en 1 hora)
            access_token = create_access_token(identity=email)
            return jsonify({
                "message": "Login exitoso",
                "access_token": access_token,
                "user_email": email
            }), 200
        else:
            return jsonify({"error": "Credenciales incorrectas"}), 401
    
    except mysql.connector.Error as err:
        return jsonify({"error": f"Error en base de datos: {str(err)}"}), 500
    except Exception as e:
        return jsonify({"error": "Error interno del servidor"}), 500

# Ruta protegida de ejemplo (requiere token JWT)
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_email = get_jwt_identity()
    return jsonify({"message": f"Acceso concedido para {current_user_email}"}), 200

# Ruta principal para probar
@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "API de Auth - Usa /register o /login"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)  # host='0.0.0.0' para acceso remoto si necesitas