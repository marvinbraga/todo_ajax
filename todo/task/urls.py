from django.urls import path
from .views import TaskList, TaskCompleted, TaskDelete

app_name = 'tasks'

urlpatterns = [
    path('', TaskList.as_view(), name='task_list_url'),
    path('<str:id>/completed/', TaskCompleted.as_view(), name='task_completed_url'),
    path('<str:id>/delete/', TaskDelete.as_view(), name='task_delete_url'),
]
