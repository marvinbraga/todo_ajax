from django.shortcuts import render, redirect

from django.views.generic import View
from .forms import TaskForm
from .models import Task
from django.http import JsonResponse
from django.forms.models import model_to_dict


class TaskList(View):

    def get(self, request):
        form = TaskForm
        tasks = Task.objects.all()
        return render(request, 'task/task_list.html', context={'form': form, 'tasks': tasks})

    def post(self, request):
        form = TaskForm(request.POST)
        if form.is_valid():
            new_task = form.save()
            return JsonResponse({'task': model_to_dict(new_task)}, status=200)
        else:
            return redirect('tasks:task_list_url')


class TaskCompleted(View):
    def post(self, request, id):
        task = Task.objects.get(id=id)
        task.completed = True
        task.save()
        return JsonResponse({'task': model_to_dict(task)}, status=200)


class TaskDelete(View):
    def post(self, request, id):
        task = Task.objects.get(id=id)
        task.delete()
        return JsonResponse({'task': 'ok'}, status=200)
