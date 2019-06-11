import requests
import random
import time

import time
starttime=time.time()
while True:
  cpu_needed_max = 10;
  memory_needed_max = 10;
  time_to_process_max = 10;  
  requests.post("http://localhost:5000",data={'cpu_needed':random.randint(1,cpu_needed_max),'memory_needed':random.randint(1,memory_needed_max),'time_to_process':random.randint(1,time_to_process_max)})
  time.sleep(10.0 - ((time.time() - starttime) % 10.0))

