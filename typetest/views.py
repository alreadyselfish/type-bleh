from django.shortcuts import render
import requests 
from django.http import HttpResponse 
import json

endpoint = "https://random-word-api.herokuapp.com/word?lang=de&number=300&"


def typetest(request):
    context = {}
    sentences = []
    for i in [3, 5, 8]:
        added = f'length={i}'
        added = endpoint + added
        response = requests.get(added).text
        sentences.append(json.loads(response)) 
    context['easy_sen'] = " ".join(sentences[0]).lower()
    context['med_sen'] = " ".join(sentences[1]).lower()
    context['hard_sen'] = " ".join(sentences[2]).lower()
    return render(request, 'ind.html', context=context)
 