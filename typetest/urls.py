from django.urls import path 
from . import views 

urlpatterns = [
    path("<int:dif>/", views.typetest),
    path("", views.homepage),
]