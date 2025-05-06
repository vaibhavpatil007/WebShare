from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import status,generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.shortcuts import render
from rest_framework.exceptions import NotFound

# Create your views here.


def index(request):
    return render(request, 'index.html')

def share_page(request):
    slug = request.GET.get('slug')
    if not slug:
        return render(request, 'index.html')
    return render(request, 'share.html', {'slug': slug})

class CreateEndpointView(generics.CreateAPIView):
    queryset = SharedEndpoint.objects.all()
    serializer_class = SharedEndpointserializer
    
    def create(self, request, *args, **kwargs):
        slug = request.data.get("slug")
        if SharedEndpoint.objects.filter(slug=slug).exists():
            
            return Response({"error":"Slug already present"},status=status.HTTP_404_NOT_FOUND)
        return super().create(request, *args, **kwargs)
    
class FileUploadView(APIView):
    def get(self, request, slug):
        # Get all files related to the given endpoint (slug)
        endpoint = get_object_or_404(SharedEndpoint, slug=slug)
        files = SharedFile.objects.filter(endpoint=endpoint)
        fileCount = SharedFile.objects.count()
        print(fileCount)

        # Serialize the files with the required fields
        serialized_files = SharedFileSerializer(files, many=True)

        # Include additional info if needed
        response_data = []
        for file in serialized_files.data:
            response_data.append({
                'id': file['id'],
                'file': file['file'],  # URL or file path
                'uploaded_at': file['uploaded_at'],
                'ip': file['ip_address'],  # Add the IP address
                'fileCount':fileCount
            })
        # response_data.append({"fileCount": fileCount})

        return Response(response_data, status=status.HTTP_200_OK)
        
    
    def post(self,request,slug):
        endpoint = get_object_or_404(SharedEndpoint, slug=slug)
        files = request.FILES.getlist('file')
        uploaded_files = []
        
        # Get real client IP
        ip_address = request.META.get('HTTP_X_FORWARDED_FOR')
        print(f"ip_address:{ip_address}")
        if ip_address:
            ip_address = ip_address.split(',')[0]
            
        else:
            ip_address = request.META.get('REMOTE_ADDR')
            
        for f in files:
            uploaded = SharedFile.objects.create(endpoint=endpoint, file=f)
            uploaded_files.append(SharedFileSerializer(uploaded).data)
        return Response(uploaded_files, status=status.HTTP_201_CREATED)
    
    def delete(self, request, slug, file_id):
        try:
            file = SharedFile.objects.get(id=file_id, endpoint__slug=slug)
            file.delete()
            return Response({"message": "File deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except SharedFile.DoesNotExist:
            raise NotFound("File not found.")

class FilesCount(APIView):
    def get(self, request):
        try:      
            filecount = SharedFile.objects.count()
        except Exception as exc:
            print(F"Exception raised is {exc}")
        content = {'filecount': filecount}
        return Response(content, status=status.HTTP_200_OK)
  
# class ListFilesView(APIView):
#     def get(self, request, slug):
#         # Get all files related to the given endpoint (slug)
#         endpoint = get_object_or_404(SharedEndpoint, slug=slug)
#         files = SharedFile.objects.filter(endpoint=endpoint)

#         # Serialize the files with the required fields
#         serialized_files = SharedFileSerializer(files, many=True)

#         # Include additional info if needed
#         response_data = []
#         for file in serialized_files.data:
#             response_data.append({
#                 'id': file['id'],
#                 'file': file['file'],  # URL or file path
#                 'uploaded_at': file['uploaded_at'],
#                 'ip': file['ip_address'],  # Add the IP address
#             })

#         return Response(response_data, status=status.HTTP_200_OK)
        
    
    