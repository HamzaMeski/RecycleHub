#!/bin/bash

# Update collection model imports
find /home/hamza2/Desktop/RecycleHub/frontend/src/app -type f -name "*.ts" -exec sed -i 's|@shared/models/collection.model|@shared/types/models|g' {} +

# Update waste-type enum imports
find /home/hamza2/Desktop/RecycleHub/frontend/src/app -type f -name "*.ts" -exec sed -i 's|@shared/models/waste-type.enum|@shared/types/enums|g' {} +

# Update auth models imports
find /home/hamza2/Desktop/RecycleHub/frontend/src/app -type f -name "*.ts" -exec sed -i 's|@shared/models/auth.models|@shared/types/models|g' {} +

# Update collection types imports
find /home/hamza2/Desktop/RecycleHub/frontend/src/app -type f -name "*.ts" -exec sed -i 's|@shared/models/collection.types|@shared/types/interfaces|g' {} +
