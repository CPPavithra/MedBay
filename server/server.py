from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
#CORS(app)

CORS(app, origins=["http://localhost:3000"])

# Database connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="daga",
    database="MedbayUserData"
)
cursor = db.cursor()

# Route to store user data
@app.route('/submit', methods=['POST'])
def store_data():
    try:
        data = request.json
        sql = """INSERT INTO user (name, email, phone, ecnumber, ecuser, vehicle_number, aadhaar_number,
                 bloodtype, gender, dob, medical_info) 
                 VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        values = (
            data["name"], data["email"], data["phone"], data["ecnumber"], data["ecuser"],
            data["vehicle_number"], data["aadhaar_number"], data["bloodtype"],
            data["gender"], data["dob"], data["medical_info"]
        )
        cursor.execute(sql, values)
        db.commit()

        return jsonify({"message": "User data stored successfully!"}), 201
    except mysql.connector.Error as err:
        return jsonify({"error": f"MySQL Error: {str(err)}"}), 500
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

# Route to handle login based on Aadhaar number
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        aadhaar_number = data['aadhaar_number']

        # Query to fetch the user data based on Aadhaar number
        sql = "SELECT * FROM user WHERE aadhaar_number = %s"
        cursor.execute(sql, (aadhaar_number,))
        user = cursor.fetchone()

        if user:
            # Return the user data as a response
            user_data = {
                "id": user[0],
                "name": user[1],
                "email": user[2],
                "phone": user[3],
                "ecnumber": user[4],
                "ecuser": user[5],
                "vehicle_number": user[6],
                "aadhaar_number": user[7],
                "bloodtype": user[8],
                "gender": user[9],
                "dob": user[10],
                "medical_info": user[11]
            }
            return jsonify({"user": user_data}), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# Route to fetch a user profile based on Aadhaar number
@app.route('/profile/<aadhaar_number>', methods=['GET'])
def profile(aadhaar_number):
    try:
        # Query to fetch the user data based on Aadhaar number
        sql = "SELECT * FROM user WHERE aadhaar_number = %s"
        cursor.execute(sql, (aadhaar_number,))
        user = cursor.fetchone()

        if user:
            # Return the user data as a response
            user_data = {
                "id": user[0],
                "name": user[1],
                "email": user[2],
                "phone": user[3],
                "ecnumber": user[4],
                "ecuser": user[5],
                "vehicle_number": user[6],
                "aadhaar_number": user[7],
                "bloodtype": user[8],
                "gender": user[9],
                "dob": user[10],
                "medical_info": user[11]
            }
            return jsonify({"profile": user_data}), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)

