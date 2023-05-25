from django.contrib import admin
from django.urls import path
from quiz.api import views

app_name = "api"



urlpatterns = [
    path("questions/", views.QuestionListCreateAV.as_view(), name='quiz-list'),
    path("questions/<int:pk>/", views.QuestionDetailAPIView.as_view(), name='quiz-detail'),

    path("options/", views.OptionListCreateAV.as_view(), name='options-list'),
    path("options/<int:pk>/", views.OptionDetailAPIView.as_view(), name='options-detail'),
    
    path("reports/", views.ReportListCreateAV.as_view(), name='report-list'),
    path("reports/<int:pk>/", views.ReportDetailAPIView.as_view(), name='report-detail'),

    path("quizes/", views.QuizListCreateAV.as_view(), name='quiz-list'),
    path("quizes/<int:pk>/", views.QuizDetailAPIView.as_view(), name='quiz-detail'),
    
]