import requests as rq

baseURL = "http://localhost:3001"
path = "/auth/register"

# POSTING a House

payload = {"full_name":"AB. MD. FAISAL RAHMAN","role":"renter","phone_number":"+8801754797363","email":"faisaljfcl@gmail.com","password":"asdfasdfasdf"}
res = rq.post(url=baseURL+path,json=payload)
print("GET ALL",res.text)
res = res.json()
