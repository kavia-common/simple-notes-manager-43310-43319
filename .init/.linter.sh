#!/bin/bash
cd /home/kavia/workspace/code-generation/simple-notes-manager-43310-43319/note_api_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

