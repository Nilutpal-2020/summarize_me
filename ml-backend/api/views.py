from rest_framework.response import Response
from rest_framework.decorators import api_view
from summarize.models import Item
from .serializers import ItemSerializer

from summarize.TextRank_extract import generate_summary
from summarize.Sentiment_Analysis import getSentiment

@api_view(['GET'])
def getData(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def summarizeText(request):
    # print(request)
    data = request.data
    summary = generate_summary(data['summary'], data['ratio'])
    data['summary'] = summary
    sentiment = getSentiment(data['summary'])
    data['sentiment'] = sentiment
    serializer = ItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    # return Response(serializer.data)
    return Response(data)
    # return Response(summary)

@api_view(['POST'])
def testSentiment(request):
    data = request.data
    # print(data)
    sentiment = getSentiment(data['summary'])
    # print(sentiment)
    return Response(sentiment)

    # data = {
    #     "summary": data['summary'],
    #     "ratio": sentiment
    # }

    # serializer = ItemSerializer(data=request.data)
    # if serializer.is_valid():
    #     serializer.save()
    # return Response(serializer["ratio"])

@api_view(['DELETE'])
def deleteSummary(request, s_id):
    item = Item.objects.get(id=s_id)
    item.delete()
    
    return Response("Summary deleted successfully!")