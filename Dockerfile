
FROM srinivasarajui/psp-v1
EXPOSE 5000
USER 1001
CMD [ "java","-jar", "/deployments/quarkus-run.jar" ]

