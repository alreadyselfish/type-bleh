from requests import get as req_get
from json import loads as json_loads 
from random import randint

from django.shortcuts import render
from django.http import Http404
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

def quote(request):
    endpoint = 'https://zenquotes.io/api/quotes'
    response = json_loads(req_get(endpoint).text)
    sentences = []
    counts = 4
    for i in response:
        counts -= 1
        if counts == 0:
            break
        sentences.append(i['q'])
    context = {}
    context['sen'] = " ".join(sentences)
    return render(request, 'ind.html', context)