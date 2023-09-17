from django.http import HttpResponse
from django.shortcuts import render


def main_page(request):

    if request.method == 'POST':
        ...

    return render(request, 'main.html')
