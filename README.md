# mailer-service

Little NodeJS mailing service

## Installation

Get the latest archive and unzip it wherever you want.
Ensure NodeJS 6.9 and Redis 3.x is installed on the target machine.

Then install PM2 in global scope :

`$ sudo npm install -g pm2`

Then install program dependencies :

`$ npm install`

> You can also use `yarn` if you prefer.

## Configuration

Copy `config.dist.yml` as `config.production.yml` inside the `config` folder :

```yaml
redis:
  host: X.X.X.X
  port: 6379 # Or whatever port you have chosen to run your Redis instance
  pass: secret # Optional: use this if your Redis is protected by authentication
  prefix: 'ms:' # Please feel free to change it to your needs. Every Redis key will be prefixed by this token.
  db: 0 # Default database
mail:
  smtp: smtp.gmail.com
  port: 587
  user: user@gmail.com
  pass: sosecretpassword
  tls: true # You can set it to false if you want but TLS encryption is recommended for privacy concerns
```

## Run

To run the service :

`$ NODE_ENV=production npm start`

This will create an instance in the PM2 service.

For further information about PM2, feel free to visit [their GitHub page](https://github.com/Unitech/pm2).

## Usage

To send a mail request from one of your applications, you will have to publish a pub/sub message on the redis channel named `mss-channel`.
The message must be a stringified JSON object :

```json
{
    "to": "recipient1@example.com, recipient2@example.com",
    "cc": "recipient3@example.net",
    "bcc": "secret@example.net",
    "subject": "This is a Secret Recipient mail",
    "body": {
        "text": "Text version of the mail",
        "html": "<h1>HTML version of the mail</h1>"
    }
}
```
