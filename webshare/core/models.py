from django.db import models

# Create your models here.
class SharedEndpoint(models.Model):
    slug = models.SlugField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.slug

class SharedFile(models.Model):
    endpoint = models.ForeignKey(SharedEndpoint, on_delete=models.CASCADE, related_name='files')
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True)
    
    def __str__(self):
        return self.file.name