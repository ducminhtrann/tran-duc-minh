# 🏗 Problem5 - Candidate Management API

## 📌 Setup & Installation

### 1️⃣ **Change Directory**

```sh
cd problem5
```

### 2️⃣ **Run MongoDB Using Docker**

MongoDB will be available at `localhost:27017` with the database name **`problem5`**.

```sh
docker-compose -f mongo-docker-compose.yaml up -d
```

### 3️⃣ **Install Dependencies**

```sh
npm install
```

### 4️⃣ **Start the Application**

By default, the app runs on `http://localhost:3000`.

```sh
npm run dev
```

---

## 📖 **CRUD API Documentation**

### 🏗 **Resource Model**

```typescript
interface Candidate {
  _id?: string;
  name: string;
  code: string; // Unique identifier
  yoe: number; // Years of Experience
  position: string;
  expected_salary: string;
  offer_salary: string;
}
```

---

## ✨ **API Endpoints**

### 🚀 **1. Create a Candidate**

#### **📌 Endpoint:** `POST /candidates`

```sh
curl -X POST "http://localhost:3000/candidates" -H "Content-Type: application/json" -d '{
           "code": "MT",
           "name": "Minh Tran",
           "position": "BE",
           "expected_salary": "2k",
           "yoe": 4,
           "offer_salary": "2k"
         }'
```

#### ✅ **Success Response**

```json
{
  "message": "success",
  "data": {
    "_id": "67a656c30a1f1e33b3ceab19",
    "code": "MT",
    "name": "Minh Tran",
    "position": "BE",
    "expected_salary": "2k",
    "yoe": 4,
    "offer_salary": "2k"
  }
}
```

---

### 🔍 **2. Get Candidate Details**

#### **📌 Endpoint:** `GET /candidates/:id`

```sh
curl http://localhost:3000/candidates/67a656c30a1f1e33b3ceab19
```

#### ✅ **Success Response**

```json
{
  "message": "success",
  "data": {
    "_id": "67a656c30a1f1e33b3ceab19",
    "code": "MT",
    "name": "Minh Tran",
    "position": "BE",
    "expected_salary": "2k",
    "yoe": 4,
    "offer_salary": "2k"
  }
}
```

---

### 📜 **3. Get List of Candidates (With Filters & Pagination)**

#### **📌 Endpoint:** `GET /candidates`

#### **Query Parameters**

| Parameter  | Type     | Description                     | Example |
| ---------- | -------- | ------------------------------- | ------- |
| `page`     | `number` | Current page (pagination)       | `1`     |
| `per_page` | `number` | Number of records per page      | `1`     |
| `name`     | `string` | Filter by name                  | `Minh`  |
| `yoe`      | `number` | Filter by years of experience   | `4`     |
| `code`     | `string` | Filter by unique candidate code | `MT`    |

#### **Example Request**

```sh
curl "http://localhost:3000/candidates?code=MT&page=1&per_page=1&name=Minh"
```

#### ✅ **Success Response**

```json
{
  "message": "success",
  "data": [
    {
      "_id": "67a656c30a1f1e33b3ceab19",
      "code": "MT",
      "name": "Minh Tran",
      "position": "BE",
      "expected_salary": "2k",
      "yoe": 4,
      "offer_salary": "2k"
    }
  ],
  "total": 1
}
```

---

### ✏ **4. Update a Candidate**

#### **📌 Endpoint:** `PUT /candidates/:id`

```sh
curl -X PUT "http://localhost:3000/candidates/67a656c30a1f1e33b3ceab19" -H "Content-Type: application/json" -d '{
           "name": "Minh Tran",
           "position": "BE",
           "expected_salary": "2k",
           "yoe": 5,
           "offer_salary": "2.5k"
         }'
```

#### ✅ **Success Response**

```json
{
  "message": "success",
  "data": {
    "_id": "67a656c30a1f1e33b3ceab19",
    "code": "MT",
    "name": "Minh Tran",
    "position": "BE",
    "expected_salary": "2k",
    "yoe": 5,
    "offer_salary": "2.5k"
  }
}
```

---

### ❌ **5. Delete a Candidate**

#### **📌 Endpoint:** `DELETE /candidates/:id`

```sh
curl -X DELETE "http://localhost:3000/candidates/67a656c30a1f1e33b3ceab19"      -H "Content-Type: application/json"
```

#### ✅ **Success Response**

```json
{
  "message": "success",
  "data": null
}
```
