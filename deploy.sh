#!/bin/bash

BUCKET_NAME=mastercode.jp-movie-react
DISTRIBUTION_ID=EUTCOEHIA15WP
PROFILE=$1

if [ -n "${PROFILE}" ]; then
  PROFILE="--profile ${PROFILE}"
fi


echo "Building app ..."

yarn build

echo "Deploying to '${BUCKET_NAME}' ..."

aws s3 sync ./build "s3://${BUCKET_NAME}/movie" --delete --exact-timestamps ${PROFILE}
aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths "/movie/*" ${PROFILE}

echo "Finished deploying to '${BUCKET_NAME}'."
