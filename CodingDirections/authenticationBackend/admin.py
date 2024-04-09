from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUser
from django.utils.translation import gettext as _

from .models import CustomUserManager, User


# admin page functionality
class UserAdmin(BaseUser):
    ordering = ['id']
    list_display = ['id', 'email', 'username', 'first_name', 'last_name', 'user_type']
    list_display_links = ['id', 'email']
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        (_('Personal Info'), {'fields': ('first_name', 'last_name')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        (_('Imp dates'), {'fields': ('last_login',)})
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2')
            # password1 and password2 are for password and confirm password
        }),
    )


admin.site.register(User, UserAdmin)
