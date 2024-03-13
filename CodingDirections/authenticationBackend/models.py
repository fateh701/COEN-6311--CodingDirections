from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser,PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, email,username=None, password=None,**extrafields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email) #converts email to lowercase
        user = self.model(username=username,email=email,**extrafields)
        user.set_password(password)   #password is saved as hash in django ,so we cant save it directly in string format
        user.save(using=self._db)  #using=self._db is used to save the user in the default database
        return user

    def create_superuser(self,email,username=None,password=None, **extrafields):
        user = self.create_user(email,username, password,**extrafields)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=200,unique=True)  #username should be unique,so only account per username
    first_name = models.CharField(max_length=200,blank=True)
    last_name = models.CharField(max_length=200,blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

# Create your models here.
