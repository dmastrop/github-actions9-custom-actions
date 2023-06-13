FROM python:3
# this dockerfile will run with python installed.

COPY requirements.txt /requirements.txt

RUN pip install -r requirements.txt
# this will install all of those dependencies below, most important one is boto3

COPY deployment.py /deployment.py
# copy over the local deployment.py file and then execute it
# with python (see below)
# this will occur when the custom action is invoked in the deploy job of the deploy.yml fle.


CMD ["python", "/deployment.py"]

# requirements.txt as a separate file contains the following to 
# add as dependencies in this docker container:
#boto3==1.24.71
#botocore==1.27.71
#jmespath==1.0.1
#python-dateutil==2.8.2
#s3transfer==0.6.0
#six==1.16.0
#urllib3==1.26.12