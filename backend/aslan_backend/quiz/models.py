from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class Quiz(models.Model):
    title = models.CharField(max_length=50)
    
    def __str__(self):
        return self.title

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    content =  models.TextField(null=False, blank=False)
    
    
    def __str__(self):
        return self.content
    
class Option(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='options')
    answer = models.CharField(max_length=100, null=False, blank=False)
    correct = models.BooleanField(null=False)
    
    def __str__(self):
        return self.answer
    
    
class Report(models.Model):
    full_name = models.CharField(max_length=100, null=False, blank=False)
    quiz = models.ForeignKey(Quiz, models.SET_NULL, null=True, blank=True)
    count = models.IntegerField()
    correct_answer = models.IntegerField(null=False, blank=False, validators=[MinValueValidator(0)])
    wrong_answer = models.IntegerField(null=False, blank=False, validators=[MinValueValidator(0)])
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.full_name
    
    class Meta:
        ordering = ['-created']
    