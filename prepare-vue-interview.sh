#!/bin/bash

CWD=$(pwd)
cd "$(dirname $0)"

TODAY=$(date +%F)
INTERVIEW_PROJECT_FOLDER="vue-frontend-${TODAY}"

rm -fr frontend/vue/node_modules
cp -r frontend/vue .
mv vue "${INTERVIEW_PROJECT_FOLDER}"
cp -r api-mock "${INTERVIEW_PROJECT_FOLDER}"
cp -r openapi "${INTERVIEW_PROJECT_FOLDER}"
rm -fr ${INTERVIEW_PROJECT_FOLDER}/.envrc ${INTERVIEW_PROJECT_FOLDER}/coverage ${INTERVIEW_PROJECT_FOLDER}/*.tsbuildinfo

cd "${INTERVIEW_PROJECT_FOLDER}"
git init --initial-branch=main
git remote add origin git@gitlab.iits.tech:pub/${INTERVIEW_PROJECT_FOLDER}.git
git add .
git commit -m "Initial commit"

echo "Create an empty repo '${INTERVIEW_PROJECT_FOLDER}' in https://gitlab.iits.tech/pub and push the local preconfigured repo '${INTERVIEW_PROJECT_FOLDER}' with:"
echo "git push --set-upstream origin main"

cd "${CWD}"
