# ECTY APP (Economical Travelling Community)

### Route:
  # 1. /register : POST 
    # registering user & verified email
  # 2. /login : POST
    # login user
  # 3. /users/:id : PATCH
    # updating user data
  # 4. /users/:id : DELETE
    # delete user account
  # 5. /users : GET
    # get user data via req.UserId
  # 6. /friendList : GET
    # get friendList data where UserId = req.UserId
  # 7. /friendList/:ectyId : POST
    # add friend into FriendList via req.body.FriendId and req.UserId
  # 8. /friendList/:id : DELETE
    # delete friend from FriendList via params id (friendListId)
  # 9. /userNotification : GET
    # get all user notification from req.UserId
  # 10. /userNotification/:id : PATCH
    # update status of user notification via params userNotification id and via req.body.status
  # 11. /userNotification/:id : DELETE
    # delete user notification via params userNotification id
  # 12. /userNotification : POST
    # adding user notification via req.body
  # 13. /itinerary : POST
    # creating itinerary via req.body
  # 14. /itinerary/:id : GET
    # get one itinerary data via params id
  # 15. /itinerary/:id : PATCH
    # updating one itinerary via params id
  # 16. /itinerary/:id : DELETE
    # deleting one itinerary via params id
  # 17. /itineraryTransportation/:id : PATCH
    # updating itinerary transportation via params id and req.body
  # 18. /itineraryTransportation/:id : DELETE
    # deleting itinerary transportation via params id
  # 19. /itineraryTransportation/:id : GET
    # get one itinerary transportation via params id
  # 20. /itineraryTransportation : POST
    # create itinerary transportation via req.body
  # 21. /itineraryPlaces/:id : PATCH
    # updating itinerary places via params id and req.body
  # 22. /itineraryPlaces/:id : DELETE
    # deleting itinerary places via params id
  # 23. /itineraryPlaces/:id : GET
    # get one itinerary places via params id
  # 24. /itineraryPlaces : POST
    # create itinerary places via req.body
  # 25. /groupChat : POST
    # create group chat via req.body 
  # 26. /groupChat/:id : GET
    # get groupChat via params id
  # 27. /groupChat/:id : PATCH
    # updating groupChat via params id
  # 28. /groupChat/:id : DELETE
    # deleting groupChat via params id
  # 29. /groupMember/:groupChatId : POST
    # create group member via req.body group chat id and via req.UserId
  # 30. /groupMember/:groupChatId : GET
    # get all data of group member via params where group chat id
  # 31. /groupMember/:id : DELETE
    # deleting groupMember via groupMember id on params
  # 32. /groupMessage/:groupMemberId : POST
    # creating group message via req.body 
  # 33. /groupMessage/:groupMemberId: GET
    # get all data where group member id = params group member id
  # 34. /verification/phoneNumber 
    # verification phone number
  # 35. /verification/ktp
    # verification ktp
  # 36. /verification/email
    # send 4 digit code to verification email
  # 37. /verification/email-verification
    # to check and confirm email has been verified