# Configure AWS provider
provider "aws" {
  region = "ap-south-1"
}

# Create an S3 bucket
resource "aws_s3_bucket" "my_bucket" {
  bucket = "my-terraform-demo-bucket-2026-unique123"

  tags = {
    Name = "TerraformBucket"
  }
}

# Display bucket name
output "bucket_name" {
  value = aws_s3_bucket.my_bucket.bucket
}

# Display bucket ID
output "bucket_id" {
  value = aws_s3_bucket.my_bucket.id
}
