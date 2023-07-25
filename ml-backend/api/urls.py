from django.urls import path
from . import views

urlpatterns = [
    path('api/TR/', views.getData),
    path('api/TR/summarize', views.summarizeText),
    path('api/TR/delete/<str:s_id>/', views.deleteSummary),
    path('api/TR/sentiment', views.testSentiment),
]
