import { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import GradientBackground from '../../components/GradientBackground';
import Button from '../../components/Button';
import Card from '../../components/Card';

interface CellGroup {
  id: string;
  name: string;
  memberCount: number;
  inviteCode: string;
}

const sampleGroups: CellGroup[] = [
  { id: '1', name: 'Morning Glory', memberCount: 8, inviteCode: 'MORNING24' },
  { id: '2', name: 'Youth on Fire', memberCount: 12, inviteCode: 'YOUTH42' },
];

const sampleMembers = [
  { id: '1', name: 'Sarah Johnson', readingStreak: 12 },
  { id: '2', name: 'Mark Williams', readingStreak: 5 },
  { id: '3', name: 'Emily Davis', readingStreak: 0 },
  { id: '4', name: 'David Chen', readingStreak: 20 },
];

export default function GroupsScreen() {
  const [groups] = useState(sampleGroups);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [inviteCode, setInviteCode] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  if (selectedGroup) {
    const group = groups.find((g) => g.id === selectedGroup);
    return (
      <GradientBackground>
        <ScrollView contentContainerClassName="px-5 pt-14 pb-8">
          <TouchableOpacity onPress={() => setSelectedGroup(null)} className="mb-4">
            <Text className="text-sky-sunrise text-base">← Back to Groups</Text>
          </TouchableOpacity>

          <Text className="text-white text-2xl font-bold mb-1">{group?.name}</Text>
          <View className="bg-sky-deep/60 border border-sky-day/30 rounded-xl px-4 py-3 mb-6">
            <Text className="text-sky-light text-sm">Invite Code</Text>
            <Text className="text-sky-sunrise text-xl font-bold tracking-widest">
              {group?.inviteCode}
            </Text>
          </View>

          <Text className="text-white text-lg font-semibold mb-3">
            Members ({group?.memberCount})
          </Text>
          {sampleMembers.map((member) => (
            <View
              key={member.id}
              className="bg-sky-deep/60 border border-sky-day/20 rounded-xl p-4 mb-2 flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-sky-sunrise/20 items-center justify-center mr-3">
                  <Text className="text-sky-sunrise font-bold">
                    {member.name.charAt(0)}
                  </Text>
                </View>
                <View>
                  <Text className="text-white font-semibold">{member.name}</Text>
                  <Text
                    className={`text-sm ${member.readingStreak > 0 ? 'text-green-400' : 'text-gray-400'}`}
                  >
                    {member.readingStreak > 0
                      ? `🔥 ${member.readingStreak} day streak`
                      : 'Not started'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <ScrollView contentContainerClassName="px-5 pt-14 pb-8">
        <Text className="text-white text-2xl font-bold mb-6">Cell Groups</Text>

        <View className="flex-row gap-3 mb-6">
          <Button
            title="Create Group"
            onPress={() => { setShowCreate(true); setShowJoin(false); }}
            variant="primary"
            className="flex-1"
          />
          <Button
            title="Join Group"
            onPress={() => { setShowJoin(true); setShowCreate(false); }}
            variant="outline"
            className="flex-1"
          />
        </View>

        {showCreate && (
          <View className="bg-sky-deep/80 border border-sky-day/20 rounded-2xl p-5 mb-6">
            <Text className="text-white text-lg font-semibold mb-3">Create a Cell Group</Text>
            <TextInput
              value={newGroupName}
              onChangeText={setNewGroupName}
              placeholder="Group name..."
              placeholderTextColor="#87CEEB"
              className="bg-sky-deep/60 border border-sky-day/30 rounded-xl px-4 py-3 text-white mb-3"
            />
            <Button
              title="Create"
              onPress={() => {
                if (newGroupName.trim()) {
                  setShowCreate(false);
                  setNewGroupName('');
                }
              }}
              variant="primary"
            />
          </View>
        )}

        {showJoin && (
          <View className="bg-sky-deep/80 border border-sky-day/20 rounded-2xl p-5 mb-6">
            <Text className="text-white text-lg font-semibold mb-3">Join a Cell Group</Text>
            <TextInput
              value={inviteCode}
              onChangeText={setInviteCode}
              placeholder="Enter invite code..."
              placeholderTextColor="#87CEEB"
              autoCapitalize="characters"
              className="bg-sky-deep/60 border border-sky-day/30 rounded-xl px-4 py-3 text-white text-lg tracking-widest mb-3"
            />
            <Button
              title="Join"
              onPress={() => {
                if (inviteCode.trim()) {
                  setShowJoin(false);
                  setInviteCode('');
                }
              }}
              variant="primary"
            />
          </View>
        )}

        <Text className="text-white text-lg font-semibold mb-3">Your Groups</Text>
        {groups.length === 0 ? (
          <Text className="text-sky-day text-center mt-8">No groups yet. Create or join one!</Text>
        ) : (
          <View className="gap-3">
            {groups.map((group) => (
              <Card
                key={group.id}
                title={group.name}
                subtitle={`${group.memberCount} members · Code: ${group.inviteCode}`}
                onPress={() => setSelectedGroup(group.id)}
                icon={<Text className="text-2xl">👥</Text>}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </GradientBackground>
  );
}
