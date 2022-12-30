#!/bin/bash
# Script for build Dockerfile

# Product family
PRODUCT=middleware

# Customer where the product is implemented
CUSTOMER=fortaleza

# DOCKER Repository
REPOSITORY=repository.grupofortaleza.com.bo:5443

# Getting artifact version from CONFIG
VERSION=0.0.3
#VERSION=`cat src/app/config.ts | grep VERSION | sed 's/[^0-9.]*//g'`

# Getting artifact name
ARTIFACT=web-sign-docs
#ARTIFACT=`sed -nE 's/^\s*"name": "(.*?)",$/\1/p' package.json`

# Displaying build info
echo "===== Processing artifact $PRODUCT/$ARTIFACT-$CUSTOMER:$VERSION ======"

# Building the image for micro service
# docker build . -t $PRODUCT/$ARTIFACT-$CUSTOMER:$VERSION-prod --build-arg ENVIRONMENT=production 

docker build . -t $PRODUCT/$ARTIFACT-$CUSTOMER:$VERSION-test --build-arg ENVIRONMENT=testing 

# docker build . -t $PRODUCT/$ARTIFACT-$CUSTOMER:$VERSION-lb --build-arg ENVIRONMENT=lb

# docker build . -t $PRODUCT/$ARTIFACT-$CUSTOMER:$VERSION-dev --build-arg ENVIRONMENT=dev

# Renaming the tag for Google Cloud Registry
# docker tag $PRODUCT/$ARTIFACT-$CUSTOMER:$VERSION-prod $REPOSITORY/$PRODUCT/$ARTIFACT-$CUSTOMER:$VERSION-prod
docker tag $PRODUCT/$ARTIFACT-$CUSTOMER:$VERSION-test $REPOSITORY/$PRODUCT/$ARTIFACT-$CUSTOMER:$VERSION-test
# docker tag $PRODUCT/$ARTIFACT-$CUSTOMER:$VERSION-lb $REPOSITORY/$PRODUCT/$ARTIFACT-$CUSTOMER:$VERSION-lb
# docker tag $PRODUCT/$ARTIFACT-$CUSTOMER:$VERSION-dev $REPOSITORY/$PRODUCT/$ARTIFACT-$CUSTOMER:$VERSION-dev

# Deletting untagged images
# docker rmi $(docker images  | grep "<none>" | awk '{print $3}')

# Putting info for make the publish:
echo ""
echo "Execute the following for publish on Google Container Registry"
echo "  $ gcloud auth configure-docker"
# echo "  $ docker push $REPOSITORY/$PRODUCT/$ARTIFACT-$CUSTOMER:$VERSION-prod"
echo "  $ docker push $REPOSITORY/$PRODUCT/$ARTIFACT-$CUSTOMER:$VERSION-test"
# echo "  $ docker push $REPOSITORY/$PRODUCT/$ARTIFACT-$CUSTOMER:$VERSION-lb"
# echo "  $ docker push $REPOSITORY/$PRODUCT/$ARTIFACT-$CUSTOMER:$VERSION-dev"
echo ""
echo "For run the container:"
# echo "docker run --rm gcr.io/$REPOSITORY/$PRODUCT/$ARTIFACT-$CUSTOMER:$VERSION"
