// Setup script to initialize database tables and data
// Run this once to set up the post system

import { supabase } from '../../../lib/utils/supabase';

export async function setupDatabase() {
  console.log('Setting up post system database...');

  try {
    // Check if tables already exist
    const { data: tables, error: tablesError } = await supabase
      .from('post_types')
      .select('count')
      .limit(1);

    if (!tablesError) {
      console.log('Database tables already exist!');
      return { success: true, message: 'Database already set up' };
    }

    console.log('Tables do not exist. You need to run the SQL schema manually in Supabase.');
    console.log('\n1. Go to: https://umulfkhcmjgaykmtzweo.supabase.co/project/default/sql');
    console.log('2. Copy and paste the SQL from: src/lib/database/schema.sql');
    console.log('3. Run the SQL to create tables and insert default data');
    console.log('4. Come back and try generating graphics again');

    return { 
      success: false, 
      message: 'Please run SQL schema manually in Supabase dashboard' 
    };

  } catch (error) {
    console.error('Setup failed:', error);
    return { 
      success: false, 
      message: `Setup failed: ${error}` 
    };
  }
}

// Test database connection and data
export async function testDatabase() {
  try {
    console.log('Testing database connection...');

    // Test post types
    const { data: postTypes, error: postTypesError } = await supabase
      .from('post_types')
      .select('*')
      .limit(5);

    if (postTypesError) throw postTypesError;
    console.log(`✅ Found ${postTypes.length} post types:`, postTypes.map(pt => pt.name));

    // Test content templates  
    const { data: templates, error: templatesError } = await supabase
      .from('content_templates')
      .select('*')
      .limit(5);

    if (templatesError) throw templatesError;
    console.log(`✅ Found ${templates.length} content templates`);

    // Test layouts
    const { data: layouts, error: layoutsError } = await supabase
      .from('post_type_layouts')
      .select('*')
      .limit(5);

    if (layoutsError) throw layoutsError;
    console.log(`✅ Found ${layouts.length} layouts`);

    return { success: true, message: 'Database connection successful!' };

  } catch (error) {
    console.error('Database test failed:', error);
    return { 
      success: false, 
      message: `Database test failed: ${error}` 
    };
  }
}