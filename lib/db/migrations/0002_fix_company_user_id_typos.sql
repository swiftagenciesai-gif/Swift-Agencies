DO $$
BEGIN
  -- company table
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'company'
      AND column_name = 'companyld'
  ) THEN
    ALTER TABLE public."company" RENAME COLUMN "companyld" TO "companyId";
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'company'
      AND column_name = 'userld'
  ) THEN
    ALTER TABLE public."company" RENAME COLUMN "userld" TO "userId";
  END IF;

  -- related tables that may have been created with the same typo
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'orders'
      AND column_name = 'companyld'
  ) THEN
    ALTER TABLE public."orders" RENAME COLUMN "companyld" TO "companyId";
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'orders'
      AND column_name = 'userld'
  ) THEN
    ALTER TABLE public."orders" RENAME COLUMN "userld" TO "userId";
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'chatbot_configuration'
      AND column_name = 'companyld'
  ) THEN
    ALTER TABLE public."chatbot_configuration" RENAME COLUMN "companyld" TO "companyId";
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'chatbot_configuration'
      AND column_name = 'userld'
  ) THEN
    ALTER TABLE public."chatbot_configuration" RENAME COLUMN "userld" TO "userId";
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'activity_log'
      AND column_name = 'companyld'
  ) THEN
    ALTER TABLE public."activity_log" RENAME COLUMN "companyld" TO "companyId";
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'activity_log'
      AND column_name = 'userld'
  ) THEN
    ALTER TABLE public."activity_log" RENAME COLUMN "userld" TO "userId";
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'chatbot_messages'
      AND column_name = 'companyld'
  ) THEN
    ALTER TABLE public."chatbot_messages" RENAME COLUMN "companyld" TO "companyId";
  END IF;
END $$;
