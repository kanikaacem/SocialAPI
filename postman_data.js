http://localhost:3100/api/auth/register
{
    "username": "Kreeti",
    "email": "Kreeti@gmail.com",
    "password": "1234"
}

http://localhost:3100/api/auth/login
{
    "email":"Kanika@gmail.com",
    "password":"12345"
}

http://localhost:3100/api/user/629079c5ae3c41b0ee47d898
{
    "desc": "This is updated description",
    "password": "12345",
    "userId": "629079c5ae3c41b0ee47d898"
}

http://localhost:3100/api/user/629079c5ae3c41b0ee47d898

http://localhost:3100/api/user/6290a59f6ad628aa372f91fc

http://localhost:3100/api/user/62909ecbbf45ba39465b2abd/follow
{
    "userId": "6290a59f6ad628aa372f91fc"
}

http://localhost:3100/api/user/62909ecbbf45ba39465b2abd/unfollow
{
    "userId": "6290a59f6ad628aa372f91fc"
}

http://localhost:3100/api/post/savePost
{
    "userId": "62909ecbbf45ba39465b2abd",
    "desc": "This is a 2nd Post description"
}
