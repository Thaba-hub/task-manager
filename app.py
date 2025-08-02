
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

DATA_FILE = "tasks.json"

def read_tasks():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as file:
        return json.load(file)

def write_tasks(tasks):
    with open(DATA_FILE, "w") as file:
        json.dump(tasks, file)

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(read_tasks())

@app.route("/tasks", methods=["POST"])
def add_task():
    tasks = read_tasks()
    new_task = request.json
    tasks.append(new_task)
    write_tasks(tasks)
    return jsonify({"message": "Task added!"}), 201

@app.route("/tasks/<int:index>", methods=["PUT"])
def update_task(index):
    tasks = read_tasks()
    tasks[index] = request.json
    write_tasks(tasks)
    return jsonify({"message": "Task updated!"})

@app.route("/tasks/<int:index>", methods=["DELETE"])
def delete_task(index):
    tasks = read_tasks()
    tasks.pop(index)
    write_tasks(tasks)
    return jsonify({"message": "Task deleted!"})

if __name__ == "__main__":
    app.run(debug=True)
