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
       password=os.environ.get('DB_PASS'),
       database=os.environ.get('DB_NAME'),
       port=int(os.getenv("DB_PORT"))
   )


#muestra todas las basicas
@app.route('/api/basicas')
def mostrar_basicas():
   db = get_db_connection()
   cursor = db.cursor(dictionary=True)  # dictionary=True devuelve filas como diccionarios
   cursor.execute("SELECT nombre, marca, tipo, id_talles, precio FROM shoes WHERE tipo = 'basica'")  # productos es tu tabla
   data = cursor.fetchall()  # trae todas las filas
   cursor.close()
   db.close()
  
   return jsonify(data)  # por ahora devolvemos los resultados como texto


#muestra todas las deportivas
@app.route('/api/deportivas')
def mostrar_deportivas():
   db = get_db_connection()
   cursor = db.cursor(dictionary=True)
   cursor.execute("SELECT nombre, marca, tipo, id_talles, precio FROM shoes WHERE tipo = 'deportiva'")
   data = cursor.fetchall()
   cursor.close()
   db.close()
  
   return jsonify(data) 




#muestra todas las high-tops
@app.route('/api/high-tops')
def mostrar_highTops():
   db = get_db_connection()
   cursor = db.cursor(dictionary=True)
   cursor.execute("SELECT nombre, marca, tipo, id_talles, precio FROM shoes WHERE tipo = 'high-top'")
   data = cursor.fetchall()
   cursor.close()
   db.close()
  
   return jsonify(data)




#muestra todas las running
@app.route('/api/running')
def mostrar_running():
   db = get_db_connection()
   cursor = db.cursor(dictionary=True)
   cursor.execute("SELECT nombre, marca, tipo, id_talles, precio FROM shoes WHERE tipo = 'running'")
   data = cursor.fetchall()
   cursor.close()
   db.close()
  
   return jsonify(data)




@app.route('/api/shoes/destacados', methods=['GET'])
def mostrar_destacados():
   db = get_db_connection()
   cursor = db.cursor(dictionary=True)  # dictionary=True devuelve filas como diccionarios
   query = "SELECT * FROM shoes WHERE nombre IN (%s, %s, %s, %s)"
   valores = ('Samba OG', 'Amplimove', 'MC trainer', 'Dunk low retro')
   cursor.execute(query, valores)  # productos es tu tabla
   data = cursor.fetchall()  # trae todas las filas
   cursor.close()
   db.close()
  
   return jsonify(data)


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
       #hacer un print para ver que llega (para ver los errores)
      
       # Validaciones
       if not email or not password:
           return jsonify({"error": "Email y password son requeridos"}), 400
       if not is_valid_email(email):
           return jsonify({"error": "Email inválido"}), 400
       if len(password) <= 6:
           return jsonify({"error": "Password debe tener al menos 6 caracteres"}), 400
      
       # Verificar si email ya existe
       db = get_db_connection()
       cursor = db.cursor()
       cursor.execute("SELECT id_usuario FROM usuarios WHERE email = %s", (email,))
       if cursor.fetchone():
           cursor.close()
           db.close()
           return jsonify({"error": "Email ya registrado"}), 409  # Conflicto
      
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


#muestra tabla shoes. /api porque se conecta con lo de fede
@app.route('/api/shoes', methods=['GET'])
def mostrar_shoes():
   db = get_db_connection()
   cursor = db.cursor()
   try:
       cursor.execute("SELECT id_shoes, nombre, tipo, marca, precio, img_url FROM shoes")
       rows = cursor.fetchall()
      
       # Convierte los resultados a una lista de diccionarios
       products = []
       for row in rows:
           product = {
               "id": row[0],
               "name": row[1],
               "type": row[2],
               "brand": row[3],
               "price": (row[4]),
               "image": row[5] if row[5] else None
           }
           products.append(product)
      
       return jsonify(products), 200
   except Exception as e:
       print("ERROR EN /api/shoes:", e) # Ver error en consola
       return jsonify({"error": "Error al obtener productos", "detalle": str(e)}), 500
   finally:
       cursor.close()
       db.close()  #devolve los resultados como texto


#Ruta para mostrar seccion principal (productos destacados)
@app.route('/api/seccion/destacadas', methods=['GET'])
def mostrar_seccionPrincipal():
   db = get_db_connection()
   cursor = db.cursor(dictionary=True) 
   query = "SELECT * FROM shoes WHERE id_shoes IN (%s, %s, %s)"
   valores = (2, 4, 5)
   cursor.execute(query, valores)  # productos es tu tabla
   data = cursor.fetchall()  # trae todas las filas
   cursor.close()
   db.close()
  
   return jsonify(data)


# Ruta para agregar comentario
@app.route('/api/comentarios', methods=['POST'])
def agregar_comentario():
   try:
       data = request.get_json()
       user_email = data.get("user_email")
       shoe_id = data.get("shoe_id")
       comentario = data.get("comentario")
      
       if not user_email or not shoe_id or not comentario:
           return jsonify({"error": "Faltan datos requeridos"}), 400
      
       db = get_db_connection()
       cursor = db.cursor()
      
       # Insertar comentario
       cursor.execute(
           "INSERT INTO comentarios (user_email, shoe_id, comentario) VALUES (%s, %s, %s)",
           (user_email, shoe_id, comentario)
       )
       db.commit()
       cursor.close()
       db.close()
      
       return jsonify({"message": "Comentario agregado exitosamente"}), 201
  
   except mysql.connector.Error as err:
       return jsonify({"error": f"Error en base de datos: {str(err)}"}), 500
   except Exception as e:
       return jsonify({"error": "Error interno del servidor"}), 500




# Ruta para traer comentarios de un zapato específico
@app.route('/api/comentarios/traer/<int:shoe_id>', methods=['GET'])
def traer_comentarios(shoe_id):
   try:
       db = get_db_connection()
       cursor = db.cursor(dictionary=True)
      
       cursor.execute(
           "SELECT user_email, comentario, fecha FROM comentarios WHERE shoe_id = %s",
           (shoe_id,)
       )
       comentarios = cursor.fetchall()
      
       cursor.close()
       db.close()
      
       return jsonify(comentarios), 200
  
   except mysql.connector.Error as err:
       return jsonify({"error": f"Error en base de datos: {str(err)}"}), 500
   except Exception as e:
       return jsonify({"error": "Error interno del servidor"}), 500


if __name__ == '__main__':
   app.run(debug=True, host='0.0.0.0', port=5000)  # host='0.0.0.0' para acceso remoto (por si acaso)