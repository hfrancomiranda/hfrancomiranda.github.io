

# postgres db connection
import psycopg2

conn = psycopg2.connect(database='finances', host='localhost', port=5432, user='postgres')
conn.autocommit = True
cursor = conn.cursor()

# drop income table
# sql_drop_customer_requests = """DROP TABLE CUSTOMER_REQUESTS;"""
# cursor.execute(sql_drop_customer_requests)

# create/fill in table in postgres
sql_customer_requests = """CREATE TABLE CUSTOMER_REQUESTS(firstname character varying(50), lastname character varying(50), email character varying(50), service character varying(50),
details character varying(500));"""
cursor.execute(sql_customer_requests)

conn.commit()

conn.close()