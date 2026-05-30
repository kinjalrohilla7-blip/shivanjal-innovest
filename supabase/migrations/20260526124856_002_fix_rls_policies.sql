/*
  # Fix RLS Security Policies

  1. Security Changes
    - Replace overly permissive policies on `properties` table
    - Replace overly permissive policies on `property_images` table
    - Replace overly permissive policies on `locality_insights` table
    
  2. Changes Made
    - DROP existing permissive INSERT and UPDATE policies
    - Create new restrictive policies that require ownership verification
    - Properties: Only property owners or admins can insert/update
    - Property Images: Only property owners can add images
    - Locality Insights: Only property owners can add insights

  3. Important Notes
    - For a platform where anyone can list properties, we'd typically require:
      a) User authentication
      b) Property ownership tracking (user_id column)
      c) Admin role system
    - Since this is a demo/read-only platform, we're making policies restrictive
      by requiring a user_id field that matches auth.uid()
    - This is a significant security improvement over the previous implementation
*/

-- First, add a user_id column to properties for ownership tracking
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'created_by_user_id'
  ) THEN
    ALTER TABLE properties ADD COLUMN created_by_user_id uuid REFERENCES auth.users(id);
  END IF;
END $$;

-- Drop the problematic permissive policies on properties
DROP POLICY IF EXISTS "Authenticated users can insert properties" ON properties;
DROP POLICY IF EXISTS "Authenticated users can update properties" ON properties;

-- Create secure INSERT policy for properties
-- Users can only insert if they set created_by_user_id to their own user id
CREATE POLICY "Users insert own properties"
  ON properties FOR INSERT
  TO authenticated
  WITH CHECK (created_by_user_id = auth.uid());

-- Create secure UPDATE policy for properties
-- Users can only update properties they created
CREATE POLICY "Users update own properties"
  ON properties FOR UPDATE
  TO authenticated
  USING (created_by_user_id = auth.uid())
  WITH CHECK (created_by_user_id = auth.uid());

-- For demo purposes, also allow service role to manage properties
-- This is for admin/seed data operations
CREATE POLICY "Service role manages properties"
  ON properties FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Drop the problematic permissive policy on property_images
DROP POLICY IF EXISTS "Authenticated users can insert property images" ON property_images;

-- Create secure INSERT policy for property_images
-- Users can only insert images for properties they own
CREATE POLICY "Users insert images for own properties"
  ON property_images FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_images.property_id
      AND properties.created_by_user_id = auth.uid()
    )
  );

-- Service role can manage images
CREATE POLICY "Service role manages property images"
  ON property_images FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Drop the problematic permissive policy on locality_insights
DROP POLICY IF EXISTS "Authenticated users can insert locality insights" ON locality_insights;

-- Create secure INSERT policy for locality_insights
-- Users can only insert insights for properties they own
CREATE POLICY "Users insert insights for own properties"
  ON locality_insights FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = locality_insights.property_id
      AND properties.created_by_user_id = auth.uid()
    )
  );

-- Service role can manage locality insights
CREATE POLICY "Service role manages locality insights"
  ON locality_insights FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
