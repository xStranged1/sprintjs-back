# SprintJS
### The backend of this project is designed to handle key aspects of a runner's performance and progress. It manages the following core features:
- Sprints: Stores data related to individual running sessions, including time, pace, distance, and other relevant metrics.
- Circuits: Tracks different running routes or circuits, capturing the distance and characteristics of each.
- Distances: Records the total distances covered across different sprints and circuits, helping users monitor their progress over time.
- Users: Handles user accounts and authentication, allowing runners to log in and access their data.
- Personal Records: Stores personal bests, providing users with insights into their top performances and improvements.
### The system is designed to offer a comprehensive view of a runner’s activity, with the ability to track and compare personal milestones and performance.

#### Made with: ExpressJS + TypeORM
#### Database in Postgresql deployed in render
#### Deployed API REST in railway
#### Authentication in Auth0

## How to run
```
npm install
```
```
npm run dev
```

### Save backup.dump in postgresql 16
```
docker run --rm -e PGPASSWORD="PGPASSWORD" -v ${PWD}:/backups postgres:16 `
 pg_dump -h PGHOST `
 -U PGUSER `
 -d DBNAME `
 -F c `
 -f /backups/sprint_backup.dump
```
### Restore backup.dump in postgresql
```
docker run --rm -e PGPASSWORD="PGPASSWORD" -v ${PWD}:/backups postgres:16 `
  pg_restore -h PGHOST `
  -U PGUSER `
  -p PORT `
  -d DBNAME `
  --verbose `
  /backups/sprint_backup.dump
```


### Restore local backup.dump cmd (set password db)
```cmd
"C:\Program Files\PostgreSQL\16\bin\pg_restore.exe" ^ 
  --host=localhost ^
  --port=5432 ^
  --username=postgres ^
  --dbname=sprintjs ^ 
  --password=^
  --verbose ^
  --clean ^
  "C:\Users\Fede\Desktop\backup\1-6\sprint_backup.dump"
```
