"""
URL configuration for webshare project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from core.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('share/', share_page, name='share-page'),
    path('create-endpoint/', CreateEndpointView.as_view(), name='create-endpoint'),
    path('filescount/',FilesCount.as_view(),name='FilesCount'),
    path('<slug:slug>/', FileUploadView.as_view(), name='upload-file'),
    path('<slug:slug>/delete/<int:file_id>/', FileUploadView.as_view(), name='file-delete'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
