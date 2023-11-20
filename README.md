# HiveMind

## TODO

1. Make front and make it beautiful
2. Add Docker launching
3. Deploy through github actions

## Tech

### Launch with proxy in development
ng serve --proxy-config proxy.conf.json

#### Contracts  
https://github.com/adenh93/django-typomatic
./manage.py generate_ts --back user

#### Users
1. Admin: gwax, andrei.mitriakov@gmail.com, pwd: ih

#### Docekr
1. Mysql
    docker run --name mysql -d \
        -p 3306:3306 \
        -e MYSQL_ROOT_PASSWORD=root \
        -v mysql:/var/lib/mysql \
        mysql:8

2. Python app:
    docker run --name django -d \
        -p 8000:8000 \
    