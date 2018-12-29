# Secret Santa

Send Text messages to your friends with their secret santa

## Usage
- After filling the secrets
- run `docker-compose --run --rm <env> sh`
- then, inside the container `npm i`
- then `node index.js` it will use the variables you set

## Secret File Values `prod.env` and `test.env`
- `TWILIO_PHONE`
- `TWILIO_ACCOUNT_ID`
- `TWILIO_AUTH_TOKEN`

## References
- https://www.twilio.com/docs/iam/test-credentials
