# returns True if number is even
def generalPagination(request):
    pageCongf = {"page": 0, "per_page": 20}

    if request.get_json():
        filters = request.get_json().items()
        for key , value in filters:
            if key ==  'page':
                pageCongf["page"] = int(value)
            if key == 'per_page':
                pageCongf["per_page"] = int(value)
                  
    return {"page": pageCongf["page"], "per_page": pageCongf["per_page"]}