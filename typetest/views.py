from django.shortcuts import render
import requests 
from django.http import HttpResponse, Http404
import json
from random import randint
from .words_db import ret_words

words = ret_words()
def typetest(request, dif):
    if dif not in (1, 2, 3):
        return Http404
    sentence = []
    context = {}
    for i in range(99):
        sentence.append(words[dif][randint(0, 699)])
    context['sen'] = " ".join(sentence)
    return render(request, 'ind.html', context=context)

def homepage(request):
    context = {}
    return render(request, 'home.html', context)