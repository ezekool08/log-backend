provider "aws" {
  region = "us-east-1"
}

resource "aws_db_instance" "postgres" {
  identifier           = "log-db"
  engine              = "postgres"
  engine_version      = "13.7"
  instance_class      = "db.t3.micro"
  allocated_storage   = 20
  storage_type        = "gp2"
  username           = "dbuser"
  password           = "dbpassword"
  skip_final_snapshot = true

  vpc_security_group_ids = [aws_security_group.db.id]
}

resource "aws_security_group" "db" {
  name = "log-db-sg"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_elastic_beanstalk_application" "app" {
  name = "log-backend"
}

resource "aws_elastic_beanstalk_environment" "env" {
  name                = "log-backend-env"
  application         = aws_elastic_beanstalk_application.app.name
  solution_stack_name = "64bit Amazon Linux 2 v5.5.6 running Node.js 16"

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "InstanceType"
    value     = "t2.micro"
  }

  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MinSize"
    value     = "1"
  }

  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MaxSize"
    value     = "2"
  }
}
