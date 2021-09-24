
# Election-API




## API Reference

#### cast vote

```http
  POST /api/vote
```

| Request Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `{
  "name": "string"
}` | `string` | **Required**. Your prefered candidate name |

#### Get votes count

```http
  GET /api/candidate/${id}/count
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of candidate |



## SQL scripts to create the database 
![Capture](https://user-images.githubusercontent.com/77564032/134655269-0905a3cd-0ab7-4128-ad48-33e80735577f.PNG)

CREATE DATABASE election
    WITH 
    OWNER = wazeem
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

CREATE TABLE IF NOT EXISTS public.candidates
(
    id integer,
    name text,
    votes integer,
    PRIMARY KEY (id)
);

ALTER TABLE public.candidates
    OWNER to wazeem;

INSERT INTO public.candidates(
	id, name, votes)
	VALUES (1, "SLFP", 0),
	(2, "UNP", 0)
	(3, "PJP", 0)
	(4, "j", 0);

  
## Run application

navigate to election folder and run the following command
```bash
  npm install

  npm start
```

type the following url in browser
```bash
  http://localhost:5000/api-docs/
```
### cast vote
click on "POST /api/vote" 

click on "Try it out" button

Enter the following code into the Request body field

// to vote SLFP
```bash
{
  "name": "SLFP"              
}                            
```
// to vote UNP
```bash
{
  "name": "UNP"              
}                            
```
// to vote PJP
```bash
{
  "name": "PJP"              
}                            
```

click on "execute" button.


### count vote for the candidate

click on "GET /api/candidate/{id}/count" 

click on "Try it out" button

type id in the id field

// to count SLFP vote
```bash
1                           
```
// to count UNP vote
```bash
2                       
```
// to count PJP vote
```bash
3                           
```
