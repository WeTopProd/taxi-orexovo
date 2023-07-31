from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, phone, car_number, password, **extra_fields):
        if not phone:
            raise ValueError('Поле телефон должно быть задано.')
        if not car_number:
            car_number = None
        user = self.model(phone=phone, car_number=car_number,
                          **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, phone, car_number, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(phone, car_number, password,
                                 **extra_fields)

    def create_superuser(
            self, phone,
            car_number='A666AA777', password=None, **extra_fields
    ):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(phone, car_number, password,
                                 **extra_fields)
