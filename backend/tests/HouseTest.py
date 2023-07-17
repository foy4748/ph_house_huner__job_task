import requests as rq

baseURL = "http://localhost:3001"
path = "/house"

# POSTING a House

payload = {
    "name":"Shanti Villa",
    "address":"Test",
    "city":"Dhaka",
    "bedrooms":4,
    "bathrooms":5,
    "phone_number":"01717111236",
    "room_size":"6 x 6",
    "picture":"https://example.com",
    "rent_per_month":"12000",
    "description":"Very good, comfy house"
}

res = rq.post(url=baseURL+path,json=payload)
print("GET ALL",res.text)
res = res.json()

res = rq.get(url=baseURL+path+"/"+res["_id"])
print("GET SINGLE",res.text)
res = res.json()

res = rq.delete(url=baseURL + path + "/" + res["_id"])
print("DELETE SINGLE",res.text)
print(res.text)
