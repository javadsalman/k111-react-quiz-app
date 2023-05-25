from rest_framework import serializers
from quiz.models import Question, Option, Report, Quiz



        
class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = '__all__'
        
        
class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, read_only=True)
    options_data = serializers.JSONField(write_only=True)
    class Meta:
        model = Question
        fields = '__all__'
        
    def update(self, question, validated_data):
        question.content=validated_data.get('content')
        question.save()
        question.options.all().delete()
        options = []
        for option_data in validated_data.get('options_data'):
            option = Option(
                question=question,
                answer=option_data['answer'],
                correct=option_data['correct']
            )
            options.append(option)
        Option.objects.bulk_create(options)
        return question
        
    def create(self, validated_data):
        print('SHOW', validated_data)
        question = Question.objects.create(quiz=validated_data.get('quiz'), content=validated_data.get('content'))
        options = []
        for option_data in validated_data.get('options_data'):
            option = Option(
                question=question,
                answer=option_data['answer'],
                correct=option_data['correct']
            )
            options.append(option)
        Option.objects.bulk_create(options)
        return question
    
class QuizSummarySerializer(serializers.ModelSerializer):
    question_count = serializers.IntegerField(source='questions.count', read_only=True)
    class Meta:
            model = Quiz
            fields = '__all__'
class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    class Meta:
        model = Quiz
        fields = '__all__'


class ReportSerializer(serializers.ModelSerializer):
    quiz_title = serializers.CharField(source='quiz.title', read_only=True)
    class Meta:
        model = Report
        fields = '__all__'